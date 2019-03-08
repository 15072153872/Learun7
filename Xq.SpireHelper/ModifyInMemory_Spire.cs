//-------------------------------------------------------------
// ModifyInMemory_Spire.cs
//
// 23 May 2017 Updated
//-------------------------------------------------------------
using System;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace LicenseHelper1
{
    public static class ModifyInMemory_Spire
    {
        public static void ActivateMemoryPatching()
        {
            Assembly[] arr = AppDomain.CurrentDomain.GetAssemblies();
            foreach (Assembly assembly in arr)
            {
                if (assembly.FullName.StartsWith("Spire.License"))
                    ActivateForAssembly(assembly);
            }
            AppDomain.CurrentDomain.AssemblyLoad += new AssemblyLoadEventHandler(ActivateOnLoad);
        }

        private static void ActivateOnLoad(object sender, AssemblyLoadEventArgs e)
        {
            string Name = e.LoadedAssembly.FullName;
            if (Name.IndexOf("Spire.License") != -1)
                ActivateForAssembly(e.LoadedAssembly);
        }

        private static void ActivateForAssembly(Assembly assembly)
        {
            bool isFound = false;

            Type[] arrType = null;
            try
            {
                arrType = assembly.GetTypes();
            }
            catch (ReflectionTypeLoadException err)
            {
                arrType = err.Types;
            }

            MethodInfo miLicensed = typeof(ModifyInMemory_Spire).GetMethod("InvokeMe", BindingFlags.NonPublic | BindingFlags.Static);
            MethodInfo miEvaluation = null;

            foreach (Type type in arrType)
            {
                if (isFound) break;

                if (type == null) continue;

                MethodInfo[] arrMInfo = type.GetMethods(BindingFlags.NonPublic | BindingFlags.Static);

                foreach (MethodInfo info in arrMInfo)
                {
                    if (isFound) break;

                    try
                    {
                        string strMethod = info.ToString();
                        if ((strMethod.StartsWith("Byte[]")) && (strMethod.IndexOf("(System.String)") > 0))
                        {
                            miEvaluation = info;
                            MemoryPatching(miEvaluation, miLicensed);
                            isFound = true;
                            break;
                        }
                    }
                    catch
                    {
                        throw new InvalidOperationException("MemoryPatching for " + assembly.FullName + " failed !");
                    }
                }
            }

            string LData = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8TGljZW5zZSBLZXk9ImNyOERaN1hKMkR5MUs2UUJBTkRPSVRLdlpjTzZkelVod2lsSHBnVlluQ3k0cXlHV2V6TFZubFJGeFAxNU1mSWZnUmdNWm1XaEdOQWRFNFRqZWZnQ1ovbFR2b1BkSXRIbDZXdDVBNWk1TVhFbnFkQnVPMUthRnovRFFzYUdWTGhzdjlySG1ybnRxSElFRGxJeGRxYUpNcGtLb0Frd1A3d1N6T01KMVkrbUNmVTVVRmV6REwvTjd1enJ4M0Y0d2I1SGErd0E2VFQ5VFJ3SzAzejlFS01aRmwzU1lSL3o0YVU3TE0wZFNYWTlqU0ZKZ2dqZlZzRFVLaUJyVm5td1ljaXVyOUVrYmw5Q3RaWTAzdG1yZm01QlplKzZnaHRFTm4wb2gzMzh0WlJleWpjcjc0QWs3MWhnWWtuTE9CQzE1VllmalhzcXVBVW13MlI2TWNWMlBPT2JyY1RSYlhBZ3pvUWJPeWQ4U2JFWmN3aE43NktQd1dzUVFTMUowdGlZSFVLeE9tMnQ0ZkJWMGhQVmhhOUI4Y0swNHFKUVp0MDBaMWNKRGEwd2I4VWx6RWs5QkhVVzJlbk9mVDE0UnlIQ2krWUdlbVBLY2RDUXJoMXpyWVRGN0ltb0x4N3h1NGV2RFRZc2xzV0JrbFFJb3g4NnJWckVVa1N0dXErQUNTWS9xVTM5L1Zhd3Y5S0FmUjVUZUVicGt3RGhTYjBOQkFqVDhBeXRsRFZkR2ZpZzBxS0czVllpVHBYRnc1cHRMVmgrYmtkK2RnN3Z4dHZyNDVaVVdKZXlyekdOR0g3YUZZZDZwLzJNRy9YSlRsR3ovU05RbzJDUExraU83SlhuOU5HZXhaN3BIbTBkZ3pNWmJHRVhxVmR2bG04MTJhL1hMMVNxeEdVWStvNVpsVUM3WTV4Z2dhRCtGZVA5enpoeUpxSUVwcDk3My9ScTRteG1wQWZMcVNzTzJSeHlTcStpdjFDc3AwQ3JvMDc4OEhybDFteWt4dVQweWRSWVpDNkRTeDhNMi9MWTNkOXNud3U3NkFmYjVDOVF1ZE9Zc0wzREh2aGZncmNVSWUvcUhmVFo5QWF6Y3pUanlyM2RPQkFjczBLZk12Y0xVUzRSeHZDdW1NNDVyNDJnMXJ3UGluN2JBcmYvZnNMTzZtS3g0WWRoSURNWlF6V3RjbkhFSTF5TXJ6aU9pdXhMdE8xalRBV25uU2VLVDJ0cXI3Tm42Qmg5TURHNjZZK2lJaW4xV05TUCtMdDFYdXRkajNKTyt4b1FNUVB5ZFpoZkJYZXpVMEhRMnd0eEdwdzRNczRTMTVJbFg1TEdXR3dXeUdYTWNjVWd3b1RDeFRGYmgyZFo0Vkg3OVZHTEVFR1JRWEZrNTRBdlFLdFBpdUcxY0w4RFo3WEoyRHkxSzZUUWVORE9YeFl2NFNveitCMHNBS0VwTVRrNCtTYWpYNksrSjlUOFhZVXRTOE8wWWZGUFZqZkhIYTZORWQyODdVcUlqMnJnQlF1bjVDV3hCczFHUm5BYmd1Z3MyL2ZQakcwZmdQemdSYzR5Q3ZObFg4V2pKUnloc3U5VFRKTjd1R3NOdnprU2IyZWlyQmhEaG1vQ0Jqa0wyYnMzT3I2d2pnNnBUNVpmNGhEdDF0STBJNXo1aytxQXVSZnRhd1lmamhXYmpMS0xKOTlUVk1kRDZaTCtTenNtQkNWN05lYm96V0RUTWgrRnJPT292R09ZbUk1bWp4Smd1MVRXNnI1V0JUK2oxSjBFNmJIb2tEMWo0Wm1DWUQreVBPUW1PMm1yUTNGdC9jVmZwQWlJdzliRkgwZ1FIbXQ4QnNuZnQ2MVV3c1h6cSs2akNvY1hOOUMvRXZPblhTczZuVlNGSkVBL3l1QmNIazZxOWdqanBnRG1NTEcrNlpxR1VjRWMzZEp2THpuK3pNT0p3TDI4WUQxN3BLSXBUNnd6WFBFVFJwWS9qNHhoMkQvaFhJRVNHcTk1eTVmZE9MNmx1QT09IiBWZXJzaW9uPSI5LjkiPgogICAgPFR5cGU+UnVudGltZTwvVHlwZT4KICAgIDxVc2VybmFtZT5Vc2VyTmFtZTwvVXNlcm5hbWU+CiAgICA8RW1haWw+ZU1haWxAaG9zdC5jb208L0VtYWlsPgogICAgPE9yZ2FuaXphdGlvbj5Pcmdhbml6YXRpb248L09yZ2FuaXphdGlvbj4KICAgIDxMaWNlbnNlZERhdGU+MjAxNi0wMS0wMVQxMjowMDowMFo8L0xpY2Vuc2VkRGF0ZT4KICAgIDxFeHBpcmVkRGF0ZT4yMDk5LTEyLTMxVDEyOjAwOjAwWjwvRXhwaXJlZERhdGU+CiAgICA8UHJvZHVjdHM+CiAgICAgICAgPFByb2R1Y3Q+CiAgICAgICAgICAgIDxOYW1lPlNwaXJlLk9mZmljZSBQbGF0aW51bTwvTmFtZT4KICAgICAgICAgICAgPFZlcnNpb24+OS45OTwvVmVyc2lvbj4KICAgICAgICAgICAgPFN1YnNjcmlwdGlvbj4KICAgICAgICAgICAgICAgIDxOdW1iZXJPZlBlcm1pdHRlZERldmVsb3Blcj45OTk5OTwvTnVtYmVyT2ZQZXJtaXR0ZWREZXZlbG9wZXI+CiAgICAgICAgICAgICAgICA8TnVtYmVyT2ZQZXJtaXR0ZWRTaXRlPjk5OTk5PC9OdW1iZXJPZlBlcm1pdHRlZFNpdGU+CiAgICAgICAgICAgIDwvU3Vic2NyaXB0aW9uPgogICAgICAgIDwvUHJvZHVjdD4KICAgIDwvUHJvZHVjdHM+CiAgICA8SXNzdWVyPgogICAgICAgIDxOYW1lPklzc3VlcjwvTmFtZT4KICAgICAgICA8RW1haWw+aXNzdWVyQGlzc3Vlci5jb208L0VtYWlsPgogICAgICAgIDxVcmw+aHR0cDovL3d3dy5pc3N1ZXIuY29tPC9Vcmw+CiAgICA8L0lzc3Vlcj4KPC9MaWNlbnNlPg==";

            //Spire.License.LicenseProvider.SetLicenseKey(LData);
            Type type2 = assembly.GetType("Spire.License.LicenseProvider");
            MethodInfo mi = type2.GetMethod("SetLicenseKey", new Type[] { typeof(String) });
            mi.Invoke(Activator.CreateInstance(type2, null), new String[] { LData });
        }


        private static byte[] InvokeMe(String string_0)
        {
            return Convert.FromBase64String("PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8TGljZW5zZSBLZXk9IngiIFZlcnNpb249IjkuOSI+CiAgICA8VHlwZT5SdW50aW1lPC9UeXBlPgogICAgPFVzZXJuYW1lPlVzZXJOYW1lPC9Vc2VybmFtZT4KICAgIDxFbWFpbD5lTWFpbEBob3N0LmNvbTwvRW1haWw+CiAgICA8T3JnYW5pemF0aW9uPk9yZ2FuaXphdGlvbjwvT3JnYW5pemF0aW9uPgogICAgPExpY2Vuc2VkRGF0ZT4yMDE2LTAxLTAxVDEyOjAwOjAwWjwvTGljZW5zZWREYXRlPgogICAgPEV4cGlyZWREYXRlPjIwOTktMTItMzFUMTI6MDA6MDBaPC9FeHBpcmVkRGF0ZT4KICAgIDxQcm9kdWN0cz4KICAgICAgICA8UHJvZHVjdD4KICAgICAgICAgICAgPE5hbWU+U3BpcmUuT2ZmaWNlIFBsYXRpbnVtPC9OYW1lPgogICAgICAgICAgICA8VmVyc2lvbj45Ljk5PC9WZXJzaW9uPgogICAgICAgICAgICA8U3Vic2NyaXB0aW9uPgogICAgICAgICAgICAgICAgPE51bWJlck9mUGVybWl0dGVkRGV2ZWxvcGVyPjk5OTk5PC9OdW1iZXJPZlBlcm1pdHRlZERldmVsb3Blcj4KICAgICAgICAgICAgICAgIDxOdW1iZXJPZlBlcm1pdHRlZFNpdGU+OTk5OTk8L051bWJlck9mUGVybWl0dGVkU2l0ZT4KICAgICAgICAgICAgPC9TdWJzY3JpcHRpb24+CiAgICAgICAgPC9Qcm9kdWN0PgogICAgPC9Qcm9kdWN0cz4KICAgIDxJc3N1ZXI+CiAgICAgICAgPE5hbWU+SXNzdWVyPC9OYW1lPgogICAgICAgIDxFbWFpbD5pc3N1ZXJAaXNzdWVyLmNvbTwvRW1haWw+CiAgICAgICAgPFVybD5odHRwOi8vd3d3Lmlzc3Vlci5jb208L1VybD4KICAgIDwvSXNzdWVyPgo8L0xpY2Vuc2U+Cg==");
        }

        private static unsafe void MemoryPatching(MethodBase miEvaluation, MethodBase miLicensed)
        {
            IntPtr IntPtrEval = GetMemoryAddress(miEvaluation);
            IntPtr IntPtrLicensed = GetMemoryAddress(miLicensed);

            if (IntPtr.Size == 8)
                *((long*)IntPtrEval.ToPointer()) = *((long*)IntPtrLicensed.ToPointer());
            else
                *((int*)IntPtrEval.ToPointer()) = *((int*)IntPtrLicensed.ToPointer());
        }

        private static unsafe IntPtr GetMemoryAddress(MethodBase mb)
        {
            RuntimeHelpers.PrepareMethod(mb.MethodHandle);

            if ((Environment.Version.Major >= 4) || ((Environment.Version.Major == 2) && (Environment.Version.MinorRevision >= 3053)))
            {
                return new IntPtr(((int*)mb.MethodHandle.Value.ToPointer() + 2));
            }

            UInt64* location = (UInt64*)(mb.MethodHandle.Value.ToPointer());
            int index = (int)(((*location) >> 32) & 0xFF);
            if (IntPtr.Size == 8)
            {
                ulong* classStart = (ulong*)mb.DeclaringType.TypeHandle.Value.ToPointer();
                ulong* address = classStart + index + 10;
                return new IntPtr(address);
            }
            else
            {
                uint* classStart = (uint*)mb.DeclaringType.TypeHandle.Value.ToPointer();
                uint* address = classStart + index + 10;
                return new IntPtr(address);
            }
        }
    }
}
